import React from "react";

const initialState = {
  data: null,
  loading: true,
};

function useTrivia() {
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    setState({ data: null, loading: true });
    fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setState({ data: data, loading: false });
        }, 2 * 1000);
      });
  }, []);
  return state;
}

export default useTrivia;
