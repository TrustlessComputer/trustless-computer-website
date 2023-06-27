import Text from '@/components/Text';
import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const TitleLarge = css`
  font-size: ${px2rem(38)} !important;
`;

const Title = styled(Text)`
  font-size: ${px2rem(48)} !important;
  ${MediaQueryBuilder('lg', TitleLarge)}
`;

// ------- Container ------
const BorderBoxLarge = css`
  padding: 24px;
`;

const BorderBox = styled.div`
  padding: 40px;
  background-color: ${({ theme }) => theme['bg6']};
  border-radius: 12px;
  ${MediaQueryBuilder('lg', BorderBoxLarge)}
`;

export { Title, BorderBox };
