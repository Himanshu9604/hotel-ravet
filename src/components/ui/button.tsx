import * as React from 'react';
import { cn } from '@/lib/utils';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'default'|'outline'|'ghost'|'gold'; size?: 'default'|'sm'|'lg'|'icon'; }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({className,variant='default',size='default',...props},ref)=><button ref={ref} className={cn('inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',variant==='default'&&'bg-forest text-white hover:bg-forest-2',variant==='outline'&&'border border-gold/50 bg-transparent text-ink hover:bg-gold hover:text-forest',variant==='gold'&&'bg-gold text-forest hover:bg-gold-2',variant==='ghost'&&'hover:bg-cream',size==='default'&&'h-11 px-6',size==='sm'&&'h-9 px-4 text-sm',size==='lg'&&'h-13 px-8',size==='icon'&&'h-10 w-10',className)} {...props}/>);
Button.displayName='Button';
