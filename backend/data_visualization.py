import matplotlib.pyplot as plt

fig, ax = plt.subplots()

# Define the categories and their respective percentages
categories = ['Animalia', 'Plantae', 'Fungi', 'Protista', 'Chromista (Stramenopila)']
percentages = [25, 25, 20, 20, 10]  # Example values, feel free to adjust as there are no exact numbers in the text

# Plot the pie chart
ax.pie(percentages, labels=categories, autopct='%1.1f%%', startangle=90)
ax.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

plt.show()