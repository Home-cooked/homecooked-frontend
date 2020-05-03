export default string => {
  const hash = string
    .split("")
    .reduce((hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0);

  let color = "#";

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
};
