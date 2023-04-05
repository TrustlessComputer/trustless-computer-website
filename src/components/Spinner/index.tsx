import { Container } from '@/components/Spinner/styled';

interface IProps {
  className?: string;
}

const Spinner = ({ className }: IProps) => <Container className={className} />;

export default Spinner;
