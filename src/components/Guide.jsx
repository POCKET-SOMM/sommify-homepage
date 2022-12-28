export default function Guide({ ...props }) {
  return (
    <>
      <h2 className='mb-5'>guide</h2>
      <span style={{ fontSize: '20px' }}>
        <b>by pasting a recipe link:</b>
      </span>
      <br />
      <br />
      <ol>
        <li>go to BBC Food (only works with BBC Food for now)</li>
        <li>search for a recipe on the site</li>
        <li>paste the recipe link into our demo and click "Wine Me"</li>
        <li>
          look at the different properties of the wines suggested by clicking
          them open
        </li>
        <li>enjoy a marvellous culinary experience</li>
      </ol>
      <br />
      <span style={{ fontSize: '20px' }}>
        <b>by typing in:</b>
      </span>
      <br />
      <br />
      <ol>
        <li>
          type in what you are eating (for example: "steak, fries") and click
          "Wine Me"{' '}
        </li>
        <li>also enjoy a wonderful culinary experience</li>
      </ol>
    </>
  );
}
