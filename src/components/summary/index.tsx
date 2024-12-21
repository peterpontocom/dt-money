import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { priceFormatter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSummary";

export function Summary() {
  const summary = useSummary();

  return (
    <section className="w-full max-w-[1120px] -mt-20 mx-auto grid grid-cols-3 gap-8">
      <div className="bg-zinc-600 rounded-md p-8 ">
        <header className="flex items-center justify-between text-zinc-300">
          <span className="">Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong className="block mt-4 text-4xl">
          {priceFormatter.format(summary.income)}
        </strong>
      </div>
      <div className="bg-zinc-600 rounded-md p-8">
        <header className="flex items-center justify-between text-zinc-300">
          <span className="">Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong className="block mt-4 text-4xl">
          {priceFormatter.format(summary.outcome)}
        </strong>
      </div>
      <div className="bg-emerald-600 rounded-md p-8">
        <header className="flex items-center justify-between text-zinc-300">
          <span className="">Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong className="block mt-4 text-4xl">
          {priceFormatter.format(summary.total)}
        </strong>
      </div>
    </section>
  );
}
