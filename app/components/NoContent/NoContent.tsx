import Card from "../Card/Card";

const NoContent = () => {
  return (
    <Card>
      <div className="flex w-full text-red-600 h-32 mt-2 justify-center items-center font-bold text-xl">
        <p>NO CONTENT YET !</p>
      </div>
    </Card>
  );
};

export default NoContent;
