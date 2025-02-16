import { ReactNode } from 'react';
import {
	Accordion, AccordionContent, AccordionTrigger, AccordionItem
} from '@/ui/shadcn/accordion';

export default function CustomAccordion({ children }: {
	children: ReactNode
}) {
	return (
		<Accordion type={'single'} collapsible>
			{children}
		</Accordion>
	);
}

function CustomAccordionTrigger({ children }: {
	children: ReactNode
}) {
	return (
		<AccordionTrigger className={'hover:no-underline hover:cursor-pointer'}>
			{children}
		</AccordionTrigger>
	);
}

CustomAccordion.Item = AccordionItem;
CustomAccordion.Button = CustomAccordionTrigger;
CustomAccordion.Content = AccordionContent;