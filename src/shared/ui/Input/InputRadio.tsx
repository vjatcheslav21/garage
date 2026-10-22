import styles from './Input.module.scss';

interface InputRadioProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
}

export const InputRadio = <T extends string>({ value, onChange }: InputRadioProps<T>) => {
  return (
    <div className={styles.input_radio_wrapper}>
      <label className={styles.label}>
        <input
          className={styles.input_radio}
          type="radio"
          name="dimension"
          value={"mileage" as T}
          checked={value === 'mileage'}
          onChange={() => onChange('mileage' as T)}
          aria-label="Пробег"
        />
        <span className={styles.radio_text}>Пробег</span>
      </label>

      <label className={styles.label}>
        <input
          className={styles.input_radio}
          type="radio"
          name="dimension"
          value={"date" as T}
          checked={value === 'date'}
          onChange={() => onChange('date' as T)}
          aria-label="Дата"
        />
        <span className={styles.radio_text}>Дата</span>
      </label>
    </div>
  );
};
