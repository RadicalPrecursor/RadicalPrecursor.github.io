import plotly.express as px
import pandas as pd

df = pd.read_csv('https://raw.githubusercontent.com/RadicalPrecursor/RadicalPrecursor.github.io/master/by_location.csv')

fig = px.scatter(x=df['Day'], y=df['MA Total'])
fig.show()
