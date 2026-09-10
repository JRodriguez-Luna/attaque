type InputVariant = 'primary' | 'secondary';

type InputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  className?: string;
  variant?: InputVariant;
  required?: boolean;
};

const variants: Record<
  InputVariant,
  {
    border: string;
    legend: string;
  }
> = {
  primary: {
    border: 'border-lime',
    legend: 'bg-lime text-black',
  },
  // Fix Secondary
  secondary: {
    border: 'border-lime',
    legend: 'bg-lime text-black',
  },
};

export const Input = ({
  name,
  type,
  className = '',
  placeholder,
  label,
  variant = 'primary',
  required,
}: InputProps) => {
  const displayLabel = label ?? name.replace('_', ' '); // ex: full_name -> full name

  return (
    <fieldset
      className={`p-2 border rounded-xl ${variants[variant].border} ${className}`}
    >
      <legend
        aria-label={displayLabel}
        className={`px-1 ${variants[variant].legend} capitalize rounded`}
      >
        {displayLabel}
      </legend>
      <input
        className='px-1 focus:outline-none'
        name={name}
        id={name}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </fieldset>
  );
};
