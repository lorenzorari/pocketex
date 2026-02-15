interface Props {
  title: string;
  text: string;
}

const InfoTile = ({ title, text }: Props) => {
  return (
    <article className="bg-muted-background rounded-xl px-5 py-5">
      <h3 className="font-bold">{title}</h3>
      <p>{text}</p>
    </article>
  );
};

export default InfoTile;
