export function MessageBox(props) {
  const { message } = props;

  return (
    <div className="registration">
      <div className="form">
        <div className="form-group">
          <h2>{message.h2}</h2>
          <p>{message.p}</p>
        </div>
      </div>
    </div>
  );
}
