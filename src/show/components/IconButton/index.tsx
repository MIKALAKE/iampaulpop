import { cn } from 'Helpers';

import { Button } from 'Components/ui/button';
import CustomIcon from 'Components/CustomIcon';

interface IconButtonProps extends React.ComponentProps<typeof Button> {
  iconName: string;
  props?: any;
}

const IconButton = ({ className, iconName, onClick, ...props }: IconButtonProps) => (
  <Button
    data-sidebar='trigger'
    data-slot='sidebar-trigger'
    variant='ghost'
    size='icon-sm'
    className={cn(`${className}`, 'cursor-pointer')}
    onClick={onClick}
    {...props}>
    <CustomIcon name={iconName} className='h-5 w-5' />
  </Button>
);

export default IconButton;
