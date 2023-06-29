import IcArrow from '@/assets/icons/ic-arrow-right.svg';
import { ButtonArrowLink } from '@/components/ButtonLink/ButtonLink.styled';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { IContentLayer1 } from '../../constant';
import { Container } from './ContentItem.styled';

const ContentItem = (props: { item: IContentLayer1; index: number }) => {
  const { item, index } = props;
  const isLeftSide = index % 2 === 0;
  return (
    <Container isLeftSide={isLeftSide}>
      {isLeftSide && (
        <div className="left-view">
          <IconSVG src={item.img} maxWidth="520" />
        </div>
      )}
      <div className="right-view">
        <h4 className="title">{item.title}</h4>
        <h6 className="desc">{item.desc}</h6>
        <div className="content">
          {item.contents.map(content => (
            <ButtonArrowLink href={content.link} target="_blank">
              <Text className="text" size="medium" fontWeight="semibold">
                {content.title}
              </Text>
              <img alt="icon" className="icon" src={IcArrow} />
            </ButtonArrowLink>
          ))}
        </div>
      </div>
      {!isLeftSide && (
        <div className="left-view">
          <IconSVG src={item.img} maxWidth="520" />
        </div>
      )}
    </Container>
  );
};

export default ContentItem;
