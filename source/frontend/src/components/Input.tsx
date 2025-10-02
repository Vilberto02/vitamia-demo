type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return <input className="border rounded-md px-2 py-1" {...props} />;
}
