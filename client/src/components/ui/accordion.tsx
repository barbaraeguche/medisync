import { ComponentPropsWithoutRef } from 'react';
import {
	AccordionItemProps, AccordionTriggerProps, AccordionContentProps
} from '@radix-ui/react-accordion';
import {
	Accordion, AccordionContent, AccordionTrigger, AccordionItem
} from '@/components/ui/shadcn/accordion';

export default function CustomAccordion({ children, ...props }: ComponentPropsWithoutRef<typeof Accordion>) {
	return (
		<Accordion {...props}>
			{children}
		</Accordion>
	);
}

function CustomAccordionItem({ children, ...props }: AccordionItemProps) {
	return (
		<AccordionItem {...props}>
			{children}
		</AccordionItem>
	);
}

function CustomAccordionTrigger({ children, ...props }: AccordionTriggerProps) {
	return (
		<AccordionTrigger {...props}>
			{children}
		</AccordionTrigger>
	);
}

function CustomAccordionContent({ children, ...props }: AccordionContentProps) {
	return (
		<AccordionContent {...props}>
			{children}
		</AccordionContent>
	);
}

CustomAccordion.Item = CustomAccordionItem;
CustomAccordion.Trigger = CustomAccordionTrigger;
CustomAccordion.Content = CustomAccordionContent;