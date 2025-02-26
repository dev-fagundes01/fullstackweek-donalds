import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-6'>
      <div className="flex flex-col items-center gap-2">
        <Image
          src="https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy"
          alt="logo do McDonald"
          width={82}
          height={82}
        />
        <h2>FSW Donalds</h2>
      </div>

      <h3 className='font-bold text-2xl'>Seja bem-vindo</h3>
      <p>
        Clique no botão abaixo para escolher a forma de consumo e fazer o seu
        pedido
      </p>
      <Button>Escolher a forma de consumo</Button>
    </div>
  );
}
