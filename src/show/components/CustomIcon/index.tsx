import { LucideProps, LucideIcon } from 'lucide-react';

import * as Icons from './icons';

interface CustomIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
  size?: number;
}
const toPascalCase = (str: string): string => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

const CustomIcon = ({ name, size = 24, ...props }: CustomIconProps) => {
  const pascalName = toPascalCase(name);
  const IconComponent = (Icons[pascalName as keyof typeof Icons] as LucideIcon) || Icons['Ban'];

  const { className, onClick, ...restProps } = props;

  return (
    <IconComponent
      size={size}
      {...restProps}
      onClick={onClick}
      className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
    />
  );
};

export default CustomIcon;
