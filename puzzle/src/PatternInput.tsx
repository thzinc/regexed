import { FormEvent, useCallback, useEffect, useState } from "react";
import "./PatternInput.css";

interface PatternInputProps {
  onChange: (valid: boolean, pattern: RegExp | undefined) => void;
  onSubmit: (pattern: RegExp) => void;
}

export function PatternInput({ onChange, onSubmit }: PatternInputProps) {
  const [patternStr, setPatternStr] = useState<string>("");
  const [pattern, setPattern] = useState<RegExp>();
  const [valid, setValid] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (patternStr.length === 0) {
      setPattern(undefined);
      setValid(false);
      return;
    }

    try {
      const newPattern = new RegExp(patternStr);
      setPattern(newPattern);
      setValid(true);
      setError(undefined);
    } catch (err) {
      setPattern(undefined);
      setValid(false);
      setError(`${err}`);
    }
  }, [patternStr, setPattern, setValid, setError]);

  useEffect(() => {
    onChange(valid, pattern);
  }, [valid, pattern, error, onChange]);

  const submit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      if (!valid) return;
      if (!pattern) return;

      onSubmit(pattern);
    },
    [valid, pattern, onSubmit]
  );
  return (
    <form onSubmit={submit} className="pattern-input">
      <label htmlFor="pattern">Regular Expression</label>
      <fieldset>
        <div className="input">
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className={patternStr.length === 0 || valid ? "valid" : "invalid"}
            id="pattern"
            onChange={(ev) => setPatternStr(ev.target.value)}
            placeholder="^.*$"
            type="text"
            value={patternStr}
          />
        </div>
        <div className="action">
          <button type="submit" disabled={!valid}>
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
