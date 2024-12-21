import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { memo } from "react";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );
  const { register, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransaction(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <form
      className="flex gap-4"
      onSubmit={handleSubmit(handleSearchTransaction)}
    >
      <input
        type="text"
        className="flex-1 rounded-md border-0 bg-zinc-900 text-zinc-300 p-4 placeholder:text-zinc-500 outline-emerald-500"
        placeholder="Busque por transações"
        {...register("query")}
      />
      <button className="flex items-center gap-3 p-4 bg-transparent border border-solid border-emerald-300 text-emerald-300 font-bold rounded-md hover:bg-emerald-500 hover:border-emerald-500 hover:text-white ease-in">
        <MagnifyingGlass /> Buscar
      </button>
    </form>
  );
}

export const SearchForm = memo(SearchFormComponent);
