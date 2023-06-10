interface SteperProps {
  step: number;
}

export const Steper = ({ step: step }: SteperProps) => {
  return (
    <div>
      <h1> {`Вы на ${step} шаге`}</h1>
    </div>
  );
};
