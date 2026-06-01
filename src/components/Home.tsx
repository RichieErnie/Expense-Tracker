import Header from './Header';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';
import Chart from './Chart';

function Home() {
  return (
    <div className="m-5 flex justify-center">
      <div className="w-[90%] max-w-2xl">
        <Header />
        <div className="grid grid-cols-2 gap-4 my-4">
          <AddTransaction />
          <Chart />
        </div>
        <TransactionList />
      </div>
    </div>
  );
}

export default Home;