import logo from "../../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionsModal } from "../newTransactionsModal";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContext } from "react";

export function Header() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <header className="bg-zinc-900 pt-6 pr-0 pb-28">
      <div className="w-full max-w-[1120px] flex justify-between py-0 px-6 mt-0 mx-auto">
        <img src={logo} alt="" />
        <Dialog.Root>
          <Dialog.Trigger
            className="h-[50px] border-0 bg-emerald-500 text-white py-0 px-5 rounded-md cursor-pointer 
        hover:bg-emerald-700 hover:ease-in duration-100"
          >
            Nova transação
          </Dialog.Trigger>
          <NewTransactionsModal />
        </Dialog.Root>
      </div>
    </header>
  );
}
