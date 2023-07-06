# README

Helpful things:

Fetch api: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

https://stackoverflow.com/questions/16821785/update-attributes-returns-true-but-the-string-hasnt-changed

https://stackoverflow.com/questions/44627378/rails-update-model-from-another-controller

https://guides.rubyonrails.org/active_record_validations.html#uniqueness

https://plaid.com/docs/api/tokens/#linktokencreate

https://plaid.com/docs/api/items/#itemget

https://plaid.com/docs/quickstart/#how-it-works

https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript

https://stackoverflow.com/questions/4116067/purge-or-recreate-a-ruby-on-rails-database

Todos:
- create scaffold for categories ((type:monthly or savings, name, current balance, budget:boolean, budget_amt))
- paginate transactions
- make accounts belong to plaid credential, transactions belong to accounts
- add cash account to seeds
- optional true for belongs_to (so that an account doesn't have to belong to a plaid credential and a transaction doesn't have to belong to an account?)