import { VisuallyHidden } from 'radix-ui';
import {
	DialogContentProps, DialogProps, DialogTriggerProps
} from '@radix-ui/react-dialog';
import {
	Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger
} from '@/components/ui/shadcn/sheet';

export default function CustomSheet({ children, ...props }: DialogProps) {
	return (
		<Sheet {...props}>
			{children}
		</Sheet>
	);
}

function CustomSheetTrigger({ children, ...props }: DialogTriggerProps) {
	return (
		<SheetTrigger {...props}>
			{children}
		</SheetTrigger>
	);
}

function CustomSheetContent({ children, ...props }: DialogContentProps) {
	return (
		<SheetContent {...props}>
			<VisuallyHidden.Root>
				<SheetTitle/>
				<SheetDescription/>
			</VisuallyHidden.Root>
			{children}
		</SheetContent>
	);
}

CustomSheet.Trigger = CustomSheetTrigger;
CustomSheet.Content = CustomSheetContent;