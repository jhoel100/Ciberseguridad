import { Cryptokey, Pkeyvalues } from "@prisma/client";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const KeyData: React.FC<{
  data: Cryptokey & { pKeyValues: Pkeyvalues | null };
}> = (props) => {
  console.log(props.data);
  return (
    <>
    <div>Los datos de la llave son:  <br /> </div>      
      <div>Modulo:  {props.data.modulusLength}</div>
      <div>Exponente publico:  {props.data.publicExponent.toString()}</div>
      {/*<div>{props.data.asymmetricKeyType}</div>*/}
      <div>Tipo de Llave: {props.data.type}</div>
      <div><br /> </div>
      <div>El contenido de la llave es:  </div>
      <div className="whitespace-pre-wrap">{props.data.raw}</div>
      <div><br /> </div>
      {props.data.pKeyValues !== null && (
        <>
          <div>Exponente Privado:  {props.data.pKeyValues.privateExponent}</div>
          <div><br /> </div>
          <div>Primer Factor Primo:  {props.data.pKeyValues.firstPrimeFactor}</div>
          <div><br /> </div>
          <div>Segundo Factor Primo:  {props.data.pKeyValues.secondPrimeFactor}</div>
          <div><br /> </div>
          <div>Primer Exponente:  {props.data.pKeyValues.firstExponent}</div>
          <div><br /> </div>
          <div>Segundo Exponente:  {props.data.pKeyValues.secondExponent}</div>
          <div><br /> </div>
          <div>Coeficiente:  {props.data.pKeyValues.coefficient}</div>
        </>
      )}
    </>
  );
};

const KeyPageContent: React.FC<{ id: string }> = (props) => {
  const { data, isLoading } = trpc.rsa.getOne.useQuery({ id: props.id });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Key not found</div>;
  }
  return <KeyData data={data} />;
};

const KeyPage = () => {
  const { query } = useRouter();
  const { id } = query;
  if (!id || typeof id !== "string") {
    return <div>Invalid key id</div>;
  }
  return <KeyPageContent id={id} />;
};

export default KeyPage;
