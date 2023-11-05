# README

This is a simple personal finance app! This app uses Plaid's API to connect to your financial accounts and retrieve both transaction and balance data, which are then implemented into Transaction and Account objects. You can also categorize transactions into monthly or "savings" categories, and you can create a monthly budget that tracks all your transactions in a given month under each of the monthly categories for that month. The app uses devise for login/authentication management.

All frontend components can be found in app/javascript/components! Currently, this app uses Shakapacker to handle these JS components and show them on the front end in place of the standard rails views.

To begin, you can log in or signup for an account on the app:
<img width="1198" alt="CleanShot 2023-09-11 at 11 45 08@2x" src="https://github.com/usborn116/bread_app/assets/64931297/87560909-a9e1-4003-a587-8f3f30d8f598">
<img width="1195" alt="CleanShot 2023-09-11 at 11 45 22@2x" src="https://github.com/usborn116/bread_app/assets/64931297/c82df2af-e072-4100-8ef5-054141a0ab71">

Once you're in, you can view which financial institutions you have linked on the home page. Any that failed to sync the last time you tried to sync transactions from them will show a button that you can click to resolve the issue (using Plaid Link's "Update" mode). Otherwise, each institution just shows when it was last synced.
<img width="1197" alt="CleanShot 2023-09-11 at 11 46 08@2x" src="https://github.com/usborn116/bread_app/assets/64931297/b5706650-7621-4a3a-b5a7-30cc408ad55c">
<img width="1197" alt="CleanShot 2023-09-11 at 11 54 15@2x" src="https://github.com/usborn116/bread_app/assets/64931297/d0208648-6bf3-40f1-b127-a411d50df7d7">

You can view a list of all transactions, which includes data such as the name, amount, date, merchant, etc. You can also edit transactions (and accounts/categories/budgets in a similar manner):
<img width="1191" alt="CleanShot 2023-09-11 at 11 47 36@2x" src="https://github.com/usborn116/bread_app/assets/64931297/5e2e5017-6835-4b33-a287-56ab864b679a">
![CleanShot 2023-09-11 at 11 47 50](https://github.com/usborn116/bread_app/assets/64931297/0cf61f8a-74d2-45d5-bf6b-5992cf9118f9)

You can view your Accounts...
<img width="1194" alt="CleanShot 2023-09-11 at 11 48 07@2x" src="https://github.com/usborn116/bread_app/assets/64931297/76e06815-7272-47ce-ac9f-b307f67d123b">

As well as your budgets:
<img width="1198" alt="CleanShot 2023-09-11 at 11 48 14@2x" src="https://github.com/usborn116/bread_app/assets/64931297/96c231c6-37b4-498f-97f1-41fe808aaffa">

In each budget, you can see each category, the spend amounts for those categories, as well as all transactions for that month's budget:
![CleanShot 2023-09-11 at 11 51 09](https://github.com/usborn116/bread_app/assets/64931297/74ebbcdd-0250-4fb8-a453-43da2e2ea6da)

Finally, when viewing categories, you can toggle between monthly categories and your savings funds:
![CleanShot 2023-09-11 at 11 53 14](https://github.com/usborn116/bread_app/assets/64931297/c8b3a826-43a6-4c49-a304-cb9ee0001c09)

These are a few things that I found helpful/resources I used along the process of building this:

- Pagination for transactions: (https://www.npmjs.com/package/react-paginate)
- Fetch api: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- Update Models from other Controllers: https://stackoverflow.com/questions/44627378/rails-update-model-from-another-controller
- Uniqueness constraints in Rails: https://guides.rubyonrails.org/active_record_validations.html#uniqueness
- Plaid Link Token Create method: https://plaid.com/docs/api/tokens/#linktokencreate
- Plaid Get Item method: https://plaid.com/docs/api/items/#itemget
- Plaid Quickstart: https://plaid.com/docs/quickstart/#how-it-works
- Using useParams to get param data in component: https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript
- Completely wiping Rails DB: https://stackoverflow.com/questions/4116067/purge-or-recreate-a-ruby-on-rails-database
- Changing column name in migration: https://stackoverflow.com/questions/13694654/specifying-column-name-in-a-references-migration
- Adding a reference to column in migration: https://stackoverflow.com/questions/22815009/add-a-reference-column-migration-in-rails-4
- Rails Collection Select helper: https://guides.rubyonrails.org/form_helpers.html#the-collection-select-helper
- Rails sorting by multiple attributes: https://stackoverflow.com/questions/9143371/how-do-i-sort-in-ruby-rails-on-two-fields
- Pagy for Rails: https://medium.com/@barrosgiovanni1/a-step-by-step-guide-to-paginate-your-rails-app-with-pagy-gem-d177c42a43a6
- Decrement method: https://apidock.com/rails/v6.1.3.1/ActiveRecord/Persistence/decrement%21
- Dup vs. Clone methods for arrays in Ruby: https://blog.appsignal.com/2019/02/26/diving-into-dup-and-clone.html
- A whole project with a Rails backend/React frontend: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-ruby-on-rails-v7-project-with-a-react-frontend-on-ubuntu-20-04#step-5-configuring-react-as-your-rails-frontend
- Git commit undoing: https://www.freecodecamp.org/news/git-revert-commit-how-to-undo-the-last-commit/
- Add JS bundling to Rails 7 app (and use in place of importmaps): https://ryanbigg.com/2023/06/rails-7-react-typescript-setup
- Reverting commits: https://stackoverflow.com/questions/4114095/how-do-i-revert-a-git-repository-to-a-previous-commit
- Link component: https://plaid.com/docs/quickstart/#create-your-first-item
- Link: https://plaid.com/docs/link/web/#create

