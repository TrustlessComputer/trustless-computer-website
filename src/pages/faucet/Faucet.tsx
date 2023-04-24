import IcTwitter from '@/assets/icons/ic_twitter_black.svg';
import Spinner from '@/components/Spinner';
import { requestFaucet } from '@/services/faucet';
import { validateEVMAddress, validateTwitterUrl } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/string';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { TwitterShareButton } from 'react-share';
import CheckStatus from './CheckStatus/CheckStatus';
import { Container, PostStep, Step, StepBox } from './Faucet.styled';

interface IStep {
  title: string;
  desc?: any;
  HTMLContent?: any;
}

interface IFormValue {
  address: string;
}

interface IFormTweetValue {
  link: string;
}

const siteKey = '6LfM-cckAAAAALcEcvQGz1klpPruM-gvrBJRir1l';

const Faucet = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [addressInput, setAddressInput] = useState<string>('');

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const onVerify = useCallback((token: string) => {
    setToken(token);
  }, []);

  const handleLoaded = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action: 'homepage' }).then((token: string) => {
        onVerify(token);
      });
    });
  };

  const addCapcha = () => {
    // Add reCaptcha
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.addEventListener('load', handleLoaded);
    document.body.appendChild(script);
    return () => {
      const script = document.createElement('script');
      document.body.removeChild(script);
    };
  };

  useEffect(() => {
    const intervalID = setInterval(addCapcha, 8 * 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const renderStep1 = () => {
    const validateForm = (values: IFormValue): Record<string, string> => {
      const errors: Record<string, string> = {};

      if (!values.address) {
        errors.address = 'Wallet address is required.';
      } else if (!validateEVMAddress(values.address)) {
        errors.address = 'Invalid wallet address.';
      } else {
        if (addressInput !== values.address) {
          setAddressInput(values.address);
        }
      }

      return errors;
    };

    const handleSubmit = async (values: IFormValue): Promise<void> => {
      if (addressInput !== values.address) {
        setAddressInput(values.address);
      }
    };

    return (
      <Formik
        key="step1"
        initialValues={{
          address: '',
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <PostStep className="post" disable={currentStep > 1}>
              <div className="inputContainer">
                <input
                  id="address"
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className="input"
                  placeholder={`Enter wallet address`}
                />
              </div>
              <TwitterShareButton
                disabled={!addressInput || !validateEVMAddress(addressInput)}
                url={`💻 trustless.computer 💻\n\nI’m excited about the Trustless Computer launch by @generative_xyz.\n\nTC makes Bitcoin as generalized as possible. It enables developers to create DAO, DEX, NFT, tokens & more on Bitcoin.\n\nMy TC address is ${addressInput}`}
                disabledStyle={{}}
                title={''}
                hashtags={[]}
                onClick={() => {
                  setCurrentStep(2);
                }}
              >
                <div className="postBtn">
                  <img alt="ic-twitter" src={IcTwitter} />
                  <p className="text">Post Tweet</p>
                </div>
              </TwitterShareButton>
            </PostStep>
            {errors.address && touched.address && <p className="error">{errors.address}</p>}
          </form>
        )}
      </Formik>
    );
  };

  const handleSubmit = async (values: IFormTweetValue): Promise<void> => {
    if (token) {
      try {
        setSuccessMsg('');
        setLoading(true);
        setErrorMsg('');
        const data = await requestFaucet(values.link, token, addressInput);
        setSuccessMsg(data);
        setCurrentStep(3);
      } catch (error: any) {
        if (error && error.message) {
          setErrorMsg(capitalizeFirstLetter(error.message));
        } else {
          setErrorMsg('Could not verify the tweet, please try again later.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const renderStep2 = () => {
    const validateForm = (values: IFormTweetValue): Record<string, string> => {
      const errors: Record<string, string> = {};
      setErrorMsg('');
      setSuccessMsg('');
      if (!values.link) {
        errors.link = 'Tweet URL is required.';
      } else if (!validateTwitterUrl(values.link)) {
        errors.link = 'Invalid Tweet URL.';
      }

      return errors;
    };

    return (
      <Formik
        key="step2"
        initialValues={{
          link: '',
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <PostStep className="post" disable={currentStep > 2}>
              <div className="inputContainer">
                <input
                  id="link"
                  type="text"
                  name="link"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.link}
                  className="input"
                  placeholder={`Tweet URL`}
                  disabled={currentStep != 2}
                />
              </div>
              <button disabled={currentStep != 2 || loading} type="submit" className="postBtn">
                {loading ? (
                  <Spinner className="loading" />
                ) : (
                  <p className="text" style={{ paddingLeft: 22, paddingRight: 22 }}>
                    Confirm
                  </p>
                )}
              </button>
            </PostStep>
            {((errors.link && touched.link) || errorMsg) && <p className="error">{errors.link || errorMsg}</p>}
            {successMsg && <p className="success">{successMsg}</p>}
          </form>
        )}
      </Formik>
    );
  };

  const steps: IStep[] = [
    {
      title: 'Step 1',
      desc: <p className="decs">Enter wallet address and post a public tweet</p>,
      HTMLContent: renderStep1(),
    },
    {
      title: 'Step 2',
      desc: <p className="decs">Paste the URL of the tweet</p>,
      HTMLContent: renderStep2(),
    },
    // {
    //   title: 'Step 3',
    //   desc: (
    //     <p className="link" onClick={() => window.open(linkContract)}>
    //       Receive TC token in your wallet
    //     </p>
    //   ),
    // },
  ];

  const renderStep = (step: IStep, index: number) => {
    return (
      <Step active={currentStep >= index} isEnd={index === steps.length}>
        <p className="title">{step.title}</p>
        {step.desc && <p className="decs">{step.desc}</p>}
        {step.HTMLContent && step.HTMLContent}
      </Step>
    );
  };

  return (
    <Container>
      <div className="wrap-content">
        <p className="title">Faucet</p>
        <p className="subTitle">
          To receive 0.1 TC from the faucet, enter your wallet address, share on Twitter, and paste the Twitter URL back
          into the field below.
        </p>
        <p className="subTitle">
          Need more TC for a bigger project? Reach out to our team on{' '}
          <a className="discord-link" href="https://generative.xyz/discord" target="_blank">
            Discord
          </a>{' '}
          .
        </p>
        <StepBox>{steps.map((step, index) => renderStep(step, index + 1))}</StepBox>

        <CheckStatus />
      </div>
    </Container>
  );
};

export default Faucet;
