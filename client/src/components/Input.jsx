import Form from "./InputForm/Form";

function Input({ onSetIsLogin }) {
  return (
    <div className="flex items-center justify-center flex-row-reverse mt-20">
      {/* <Image /> */}
      <Form onSetIsLogin={onSetIsLogin} />
    </div>
  );
}

export default Input;
