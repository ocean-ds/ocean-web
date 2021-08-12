import React, { useState } from 'react';
import TextArea from '../TextArea';

const TextAreaControlled: React.FC = () => {
  const [value, setValue] = useState<string>('');

  return (
    <TextArea
      value={value}
      onChange={(event) => setValue(event.target.value)}
      data-testid="controlled-textarea"
    />
  );
};

export default TextAreaControlled;
