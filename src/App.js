import React, { Component } from 'react';
import './App.scss';
import { DataTable } from '@devniel/carbon-components-react';

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

class App extends Component {

  state = {
    data: null
  };

  loadData = async () => {
    const response = await fetch('https://api.github.com/events');
    const data = await response.json();
    console.log('data:', data);
    this.setState({
      data
    });
  }
  
  componentDidMount(){
    this.loadData();
  }

  render() {

    const {data} = this.state;

    return (
      <div className="App">

        {data && 
          <DataTable
            ref={(e) => {this.dataTable = e}}
            rows={data}
            headers={[
              {
                header: 'Actor',
                subheaders: [
                  {
                    header: 'Id',
                    key: 'actor.id'
                  },
                  {
                    header: 'login',
                    key: 'actor.login'
                  },{
                    header: 'url',
                    key: 'actor.url'
                  }
                ]
              },
              {
                header: 'Repository',
                subheaders: [
                  {
                    key: 'repo.name',
                    header: 'Name'
                  },
                  {
                    key: 'repo.id',
                    header: 'Id'
                  },
                  {
                    key: 'repo.url',
                    header: 'URL'
                  }
                ]
              },
              {
                key: 'type',
                header: 'event',
              }
            ]}
            render={({ rows, headers, getHeaderProps, getSelectionProps, selectAll, selectedRows }) => { 

              console.log({ rows, headers, getHeaderProps, getSelectionProps, selectAll, selectedRows });

              return (
                <React.Fragment>

                  <TableContainer>
                    <Table >

                      <TableHead >

                        <TableRow>
                          {headers.map(header => (
                            <TableHeader {...getHeaderProps({ header })} colSpan={header.subheaders ? header.subheaders.length : 1}  scope="colgroup" >
                              <div>
                                {header.header}
                              </div>
                            </TableHeader>
                          ))}
                        </TableRow>

                        <TableRow>
                          {headers.map(header => {
                            let r;
                            if(header.subheaders){
                              r = header.subheaders.map((subheader) => (
                                <TableHeader  scope="col" {...getHeaderProps({ header: subheader })}>
                                  <div>{subheader.header}</div>
                                </TableHeader>
                              ))
                            }else{
                              r = <td/>;
                            }
                            return r;
                          })}
                        </TableRow>

                      </TableHead>
                      
                      <TableBody>

                        {rows.map(row => {
                          
                          return (
                            <TableRow key={row.id}>

                              {row.cells.map(cell => (
                                <TableCell key={cell.id}>
                                  <div>
                                    {cell.value != null ? 
                                      cell.value:
                                      <div>Non existent</div>
                                    }
                                  </div>
                                </TableCell>
                              ))}

                            </TableRow>
                          );

                        })}

                      </TableBody>
                    </Table>
                  </TableContainer>

                </React.Fragment>
              );

            }

            }
          />
        }

      </div>
    );
  }
}

export default App;
