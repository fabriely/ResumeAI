import matplotlib.pyplot as plt

# Data for the distribution of eukaryotic kingdoms
kingdoms = ['Animalia', 'Plantae', 'Fungi', 'Protista', 'Chromista']
num_species = [1200000, 298000, 140000, 200000, 65000]  # Example numbers

# Pie chart for kingdom distribution
plt.figure(figsize=(10, 8))
plt.pie(num_species, labels=kingdoms, autopct='%1.1f%%', startangle=140, colors=['gold', 'lightgreen', 'lightcoral', 'lightskyblue', 'purple'])
plt.title('Distribution of Species Across Eukaryotic Kingdoms')
plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
plt.show()