import IcArrow from '@/assets/icons/ic-arrow-right-2.svg';
import { ButtonArrowLink } from '@/components/ButtonLink/ButtonLink.styled';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { IContentLayer2 } from '../../constant';
import { Container } from './ContentItem.styled';

const ContentItem = (props: { item: IContentLayer2; index: number }) => {
  const { item, index } = props;
  const isLeftSide = index % 2 === 0;
  return (
    <Container isLeftSide={isLeftSide}>
      {!isLeftSide && (
        <div className="right-view">
          {item.isPng ? <img alt="icon" src={item.img} /> : <IconSVG src={item.img} maxWidth="520" />}
        </div>
      )}
      <div className="left-view">
        <h4 className="title">{item.title}</h4>
        <h6 className="desc">
          {item.desc.map(text => (
            <p>{text}</p>
          ))}
        </h6>

        {item.contents && (
          <div className="content">
            {item.contents.map(content => (
              <ButtonArrowLink href={content.link} target="_blank" color="#4185EC">
                <Text className="text" size="medium" fontWeight="semibold">
                  {content.title}
                </Text>
                <img alt={content.title} className="icon" src={IcArrow} />
              </ButtonArrowLink>
            ))}
          </div>
        )}
      </div>

      {isLeftSide && (
        <div className="right-view">
          {item.isPng ? <img alt="icon" src={item.img} /> : <IconSVG src={item.img} maxWidth="520" />}
        </div>
      )}
    </Container>
  );
};

export default ContentItem;
