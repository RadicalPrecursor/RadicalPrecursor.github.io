import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

df = pd.read_csv('/Users/kate/covid-19-MA-data/covid_data/by_location.csv')

# I need to make a function so I'm not copy/pasting forever
# But I feel too stupid to figure out how it should be set up
# So I'm going to keep at what's working until maybe it makes more sense


app.layout = html.Div([
    dcc.Graph(
        id='state-cases',
        figure={
            'data': [
                dict(
                    x=df['Day'],
                    y=df['MA Total'],
                    mode='markers',
                    opacity=0.7,
                    marker={
                        'size': 15,
                        'line': {'width': 0.5, 'color': 'white'}
                    },
                )
            ],
            'layout': dict(
                xaxis={'title': 'Massachusetts Confirmed COVID-19 Cases'},
                yaxis={'range': [0, 3000]},
                margin={'l': 40, 'b': 40, 't': 10, 'r': 10},
                legend={'x':0, 'y': 1},
                hovermode='closest'
            )
        }
    ),

    dcc.Graph(
        id='county-cases',
        figure={
            'data': [
                dict(
                    x=df['Day'],
                    y=df['Middlesex'],
                    mode='markers',
                    opacity=0.7,
                    marker={
                        'size': 15,
                        'line': {'width': 0.5, 'color': 'white'}
                    },
                    name='Middlesex'
                ),
                
                dict(
                    x=df['Day'],
                    y=df['Suffolk'],
                    mode='markers',
                    opacity=0.7,
                    marker={
                        'size': 15,
                        'line': {'width': 0.5, 'color': 'white'}
                    },
                    name='Suffolk'
                )
            ],
            'layout': dict(
                xaxis={'title': 'COVID-19 Cases by County'},
                yaxis={'range': [0, 1000]},
                margin={'l': 40, 'b': 40, 't': 10, 'r': 10},
                legend={'x':0, 'y': 1},
                hovermode='closest'
            )
        }
    ),

    dcc.Graph(
        id='suffolk-cases',
        figure={
            'data': [
                dict(
                    x=df['Day'],
                    y=df['Suffolk'],
                    mode='markers',
                    opacity=0.7,
                    marker={
                        'size': 15,
                        'line': {'width': 0.5, 'color': 'white'}
                    },
                )
            ],
            'layout': dict(
                xaxis={'title': 'COVID-19 Cases - Suffolk County'},
                yaxis={'range': [0, 500]},
                margin={'l': 40, 'b': 40, 't': 10, 'r': 10},
                legend={'x':0, 'y': 1},
                hovermode='closest'
            )
        }
    )
])


if __name__ == '__main__':
    app.run_server(debug=True)
