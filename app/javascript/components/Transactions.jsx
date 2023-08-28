import React, {useState} from "react";
import { newData } from "./helpers/api_helpers";
import { useDataGetter } from "./helpers/useDataGetter";
import Loading from "./Loading";
import Error from "./Error";
import Input from "./Input";
import Submit from "./Submit";
import Form from "./Form";
import ReactPaginate from "react-paginate";
import List from "./List";
import Single from "./Single";

const Transactions = () => {
    const [itemOffset, setItemOffset] = useState(0);

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: 'transactions'})

    const items = data?.transactions

    const endOffset = itemOffset + 25;
    const currentItems = data?.transactions?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data?.transactions?.length / 25);

    const headers = ['Date', 'Name', 'Amount', 'Budget/Fund', 'Merchant', 'Account', 'Institution', '']

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 25) % items.length;
        setItemOffset(newOffset);
    };

    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="transactions" item='transaction' updater={newData} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="account_id" options={data.accounts}/>
                <Input type="text" name="name" placeHolder='name'/>
                <Input type="text" name="amount" placeHolder='Transaction Amount' />
                <Input type="date" name="date" val={new Date()}/>
                <Input type="text" name="merchant" placeHolder='Merchant Name' />
                <Input type="text" name="description" placeHolder='Description'/>
                <Input type="select" name="category_id" options={data.categories}/>
                <Input type="hidden" name="transaction_type" val='special'/>
                <Input type="hidden" name="transaction_id" val={`cash#${Date.now()}`}/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {!currentItems ? <Loading/> :
        <>
            
            <List headers={headers} data={currentItems} tablename='Transactions' setCreate={setCreate} setDeleting={setDeleting} setData={setData} setLoading={setLoading} setError={setError}/>
            <ReactPaginate className="bar"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
        }
        </>
          )
};

export default Transactions