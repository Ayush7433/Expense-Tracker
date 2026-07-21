import BudgetCard from "./Budgetcard";

const BudgetOverview = ({ overall, categories = [], onEdit }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {overall && <BudgetCard data={overall} onEdit={onEdit} highlight />}

      {categories.map((item) => (
        <BudgetCard key={item.category} data={item} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default BudgetOverview;
