'use client';

import { useState } from 'react';
import Icon from './Icon';

export default function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-brand-100 overflow-hidden rounded-4xl bg-white shadow-card ring-1 ring-brand-100/70">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left transition hover:bg-brand-50/50"
              >
                <span className="text-[17px] font-bold text-ink">{faq.question}</span>
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                    isOpen ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600'
                  }`}
                >
                  <Icon name={isOpen ? 'minus' : 'plus'} className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              hidden={!isOpen}
              className="px-7 pb-7 text-[15px] leading-[1.85] text-ink-soft"
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
