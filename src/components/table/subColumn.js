import React from 'react'

    export const subColumns = [

            {
              Header: 'bank',
              accessor: 'bank',
            },
            {
              Header: 'accountName',
              accessor: 'accountName',
            },
            {
              Header: 'isDefaultAccount',
              accessor: 'isDefaultAccount',
              Cell: (val) => <p>{val.cell.row.original.isDefaultAccount.toString()}</p>         
            },
            {
              Header: 'accountType',
              accessor: 'accountType',
            },
            {
              Header: 'branch',
              accessor: 'branch',
            },
            {
              Header: 'account',
              accessor: 'account',
            },
      ]

      
    