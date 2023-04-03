import { useState } from 'react';
import { Container, StepBox, Step } from './Faucet.styled';
import { Formik } from 'formik';
import { validateEVMAddress } from '@/utils';
import IcTwitter from '@/assets/icons/ic_twitter_black.svg';

interface IStep {
  title: string;
  desc?: string;
  HTMLContent?: any;
}

interface IFormValue {
  address: string;
}

const Faucet = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const renderStep1 = () => {
    const validateForm = (values: IFormValue): Record<string, string> => {
      const errors: Record<string, string> = {};

      if (!values.address) {
        // errors.address = 'Wallet address is required.';
      } else if (validateEVMAddress(values.address)) {
        errors.address = 'Invalid wallet address.';
      }

      return errors;
    };

    const handleSubmit = async (values: IFormValue): Promise<void> => {};

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
            <div className="post">
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
              <button type="submit" className="postBtn">
                <img alt="ic-twitter" src={IcTwitter} />
                <p className="text">Post Tweet</p>
              </button>
            </div>
            {errors.address && touched.address && <p className="error">{errors.address}</p>}
          </form>
        )}
      </Formik>
    );
  };

  const renderStep2 = () => {
    const validateForm = (values: IFormValue): Record<string, string> => {
      const errors: Record<string, string> = {};

      if (!values.address) {
        // errors.address = 'Wallet address is required.';
      } else if (validateEVMAddress(values.address)) {
        errors.address = 'Invalid wallet address.';
      }

      return errors;
    };

    const handleSubmit = async (values: IFormValue): Promise<void> => {};

    return (
      <Formik
        key="step2"
        initialValues={{
          address: '',
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="post">
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
              <button type="submit" className="postBtn">
                <p className="text">Create</p>
              </button>
            </div>
            {errors.address && touched.address && <p className="error">{errors.address}</p>}
          </form>
        )}
      </Formik>
    );
  };

  const steps: IStep[] = [
    {
      title: 'Step 1',
      desc: 'Enter wallet address and post a public tweet',
      HTMLContent: renderStep1(),
    },
    {
      title: 'Step 2',
      desc: 'Paste the URL of the tweet',
      HTMLContent: renderStep2(),
    },
    {
      title: 'Step 3',
      desc: 'Receive JUICE in your wallet',
    },
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
      <p className="title">Faucet</p>
      <p className="subTitle">
        To receive free JUICE for our Trustless Computer, simply enter your wallet address, share on twitter and copy
        and paste the twitter URL back into the field below.
      </p>
      <StepBox>{steps.map((step, index) => renderStep(step, index + 1))}</StepBox>
    </Container>
  );
};

export default Faucet;
