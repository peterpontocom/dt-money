import { Header } from "../../components/header";
import { Summary } from "../../components/summary";
import { SearchForm } from "./components/SearchForm";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  return (
    <div>
      <Header />
      <Summary />

      <main className="w-full max-w-[1120px] mt-16 mx-auto py-0 pr-6">
        <SearchForm />
        <table className="w-full border-separate border-spacing-x-0 border-spacing-y-2 mt-6">
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr className="" key={transaction.id}>
                  <td
                    width="40%"
                    className="py-5 px-8 first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md bg-zinc-700"
                  >
                    {transaction.description}
                  </td>
                  <td
                    className={`py-5 px-8 first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md bg-zinc-700 ${
                      transaction.type === "income"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    <span>
                      {transaction.type === "outcome" && "- "}{" "}
                      {priceFormatter.format(transaction.price)}
                    </span>
                  </td>
                  <td className="py-5 px-8 first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md bg-zinc-700">
                    {transaction.category}
                  </td>
                  <td className="py-5 px-8 first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md bg-zinc-700">
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}
