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
    border: 'focus-within:border-lime',
    legend: 'group-focus-within:bg-lime group-focus-within:text-black',
  },
  // Fix Secondary
  secondary: {
    border: 'focus-within:border-lime',
    legend: 'group-focus-within:bg-lime group-focus-within:text-black',
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
      className={`group p-2 border rounded-xl text-white ${variants[variant].border} ${className}`}
    >
      <legend
        aria-label={displayLabel}
        className={`px-1 text-white capitalize rounded ${variants[variant].legend}`}
      >
        {displayLabel}
      </legend>
      {type === 'textarea' ? (
        <textarea
          className='px-1 focus:outline-none'
          name={name}
          maxLength={50}
          id={name}
        ></textarea>
      ) : (
        <input
          className='px-1 focus:outline-none'
          name={name}
          id={name}
          type={type}
          required={required}
          placeholder={placeholder}
        />
      )}
    </fieldset>
  );
};
