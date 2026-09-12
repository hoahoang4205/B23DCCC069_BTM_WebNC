import {
  createContext,
  useContext,
  useState,
} from 'react';
import type { ReactNode, ReactElement } from 'react';
import './Accordion.css';

// Context 1: state của Accordion
interface AccordionContextValue {
  openId: string | null;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion.* phải nằm trong <Accordion>');
  return ctx;
}

// Context 2: id của từng Item
const AccordionItemContext = createContext<string | null>(null);

function useAccordionItemContext(): string {
  const id = useContext(AccordionItemContext);
  if (id === null) throw new Error('Accordion.Header/Panel phải nằm trong <Accordion.Item>');
  return id;
}

// Accordion
interface AccordionProps {
  defaultOpenId?: string | null;
  children: ReactNode;
}

function Accordion({ defaultOpenId = null, children }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  // Mở panel mới → tự động đóng panel cũ
  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <AccordionContext.Provider value={{ openId, toggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

// Accordion.Item
interface AccordionItemProps {
  id: string;
  children: ReactNode;
}

function AccordionItem({ id, children }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={id}>
      <div className="accordion-item">{children}</div>
    </AccordionItemContext.Provider>
  );
}

// Accordion.Header
interface AccordionHeaderProps {
  children: ReactNode;
}

function AccordionHeader({ children }: AccordionHeaderProps) {
  const { openId, toggle } = useAccordionContext();
  const id = useAccordionItemContext();
  const isOpen = openId === id;

  return (
    <button
      type="button"
      className={`accordion-header${isOpen ? ' open' : ''}`}
      onClick={() => toggle(id)}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
    </button>
  );
}

// Accordion.Panel
interface AccordionPanelProps {
  children: ReactNode;
}

function AccordionPanel({ children }: AccordionPanelProps) {
  const { openId } = useAccordionContext();
  const id = useAccordionItemContext();

  if (openId !== id) return null;
  return <div className="accordion-panel">{children}</div>;
}

// Gán sub-components
type AccordionComponent = ((props: AccordionProps) => ReactElement) & {
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
  Panel: typeof AccordionPanel;
};

const AccordionRoot = Accordion as AccordionComponent;
AccordionRoot.Item = AccordionItem;
AccordionRoot.Header = AccordionHeader;
AccordionRoot.Panel = AccordionPanel;

export default AccordionRoot;