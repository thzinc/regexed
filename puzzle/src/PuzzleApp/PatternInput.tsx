import { FormEvent, useCallback, useEffect, useState } from "react";
import "./PatternInput.css";

interface PatternInputProps {
  disabled?: boolean;
  onChange: (pattern?: RegExp) => void;
  onSubmit: (pattern: RegExp, source: string) => void;
}

export function PatternInput({
  disabled = false,
  onChange,
  onSubmit,
}: PatternInputProps) {
  const [patternString, setPatternString] = useState<string>("");
  const [pattern, setPattern] = useState<RegExp>();
  const [valid, setValid] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (patternString.length === 0) {
      setPattern(undefined);
      setValid(false);
      return;
    }

    try {
      const newPattern = new RegExp(patternString, "v");
      setPattern(newPattern);
      setValid(true);
      setError(undefined);
    } catch (err) {
      setPattern(undefined);
      setValid(false);
      setError(`${err}`);
    }
  }, [patternString, setPattern, setValid, setError]);

  useEffect(() => {
    onChange(pattern);
  }, [valid, pattern, error, onChange, patternString]);

  const submit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      if (!valid) return;
      if (!pattern) return;

      onSubmit(pattern, patternString);
    },
    [valid, pattern, onSubmit, patternString]
  );
  return (
    <form
      onSubmit={submit}
      className="pattern-input plausible-event-name=Attempt"
    >
      <label htmlFor="pattern">Regular Expression</label>
      <fieldset>
        <div className="input">
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className={
              patternString.length === 0 || valid ? "valid" : "invalid"
            }
            id="pattern"
            onChange={(ev) => setPatternString(ev.target.value)}
            placeholder="^.*$"
            type="text"
            value={patternString}
          />
        </div>
        <div className="action">
          <button type="submit" disabled={disabled || !valid}>
            Submit
          </button>
        </div>
      </fieldset>
      <div className="error">
        <div>{error}</div>
      </div>
    </form>
  );
}
