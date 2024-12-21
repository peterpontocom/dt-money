import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionsModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    }
  );

  const { register, handleSubmit, control, reset } =
    useForm<NewTransactionFormInputs>({
      resolver: zodResolver(newTransactionFormSchema),
    });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { category, description, price, type } = data;

    await createTransaction({
      category,
      description,
      price,
      type,
    });

    reset();
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-[#000000c2]" />
      <Dialog.Content className="min-w-[32rem] rounded-md py-9 px-12 bg-zinc-800 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="flex justify-between items-center">
          <Dialog.Title>Nova Transação</Dialog.Title>
          <Dialog.Close className="text-0">
            <X size={24} />
          </Dialog.Close>
        </div>

        <form
          action=""
          className="mt-8 flex flex-col gap-4"
          onSubmit={handleSubmit(handleCreateNewTransaction)}
        >
          <input
            type="text"
            placeholder="Descrição"
            required
            className="rounded-md border-0 bg-zinc-900 text-zinc-300 p-4 placeholder:text-zinc-500"
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            className="rounded-md border-0 bg-zinc-900 text-zinc-300 p-4 placeholder:text-zinc-500"
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            className="rounded-md border-0 bg-zinc-900 text-zinc-300 p-4 placeholder:text-zinc-500"
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <RadioGroup.Root
                  className="grid grid-cols-2 gap-4 mt-2"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <RadioGroup.Item
                    value="income"
                    className="bg-zinc-700 p-4 flex items-center justify-center gap-2 rounded-md cursor-pointer border-0 
              text-zinc-300 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:hover:bg-zinc-600 ease-in"
                  >
                    <ArrowCircleUp size={24} className="text-zinc-300" />{" "}
                    Entrada
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value="outcome"
                    className="bg-zinc-700 p-4 flex items-center justify-center gap-2 rounded-md cursor-pointer border-0 
              text-zinc-300 data-[state=checked]:bg-red-500 data-[state=unchecked]:hover:bg-zinc-600 ease-in"
                  >
                    <ArrowCircleDown size={24} className="text-red-400" /> Saída
                  </RadioGroup.Item>
                </RadioGroup.Root>
              );
            }}
          />

          <button
            type="submit"
            className="h-[58px] border-0 bg-emerald-500 text-white font-bold py-0 px-5 rounded-md mt-6 cursor-pointer hover:bg-emerald-700 ease-in"
          >
            Cadastrar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
