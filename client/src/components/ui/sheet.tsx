import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
	DialogContentProps, DialogProps, DialogTriggerProps
} from '@radix-ui/react-dialog';
import {
	Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger
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
			<VisuallyHidden>
				<SheetHeader>
					<SheetDescription>Navigation Menu Description</SheetDescription>
				</SheetHeader>
			</VisuallyHidden>
			{children}
		</SheetContent>
	);
}

CustomSheet.Trigger = CustomSheetTrigger;
CustomSheet.Content = CustomSheetContent;