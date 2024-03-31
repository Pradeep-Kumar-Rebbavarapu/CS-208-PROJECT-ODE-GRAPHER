import subprocess
import os

# Path to the Fortran executable
exe_path = 'new.exe'

# Accept manual inputs from the user
lambda2 = float(input("Enter the value for lambda2: "))
lambda3 = float(input("Enter the value for lambda3: "))
coupling1_step = float(input("Enter the value for coupling1_step: "))
coupling1_max = float(input("Enter the value for coupling1_max: "))
coupling1_min = float(input("Enter the value for coupling1_min: "))

# Prepare the input string to pass to the Fortran executable
input_data = f"{lambda2}\n{lambda3}\n{coupling1_step}\n{coupling1_max}\n{coupling1_min}\n"

# Run the Fortran executable using Popen and communicate input
process = subprocess.Popen([exe_path], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
stdout, stderr = process.communicate(input=input_data)

# Split the output into lines
output_lines = stdout.strip().split('\n')

# Initialize empty lists to store the parsed values
coupling1_values = []
r1_final_values = []
r2_final_values = []
theta1in_values = []
theta2in_values = []

# Process each line of the output
for line in output_lines:
    # Split the line by commas
    values = line.strip().split()
    # Check if the line contains coupling1, r1_final, and r2_final values
    if len(values) == 3:
        coupling1_values.append(float(values[0]))
        r1_final_values.append(float(values[1]))
        r2_final_values.append(float(values[2]))
    elif len(values) == 2:  # Check if the line contains theta1in and theta2in values
        theta1in_values.append(float(values[0]))
        theta2in_values.append(float(values[1]))

# Print or process the collected values as needed
print("Coupling1 values:", coupling1_values)
print("r1_final values:", r1_final_values)
print("r2_final values:", r2_final_values)
print("Theta1in values:", theta1in_values)
print("Theta2in values:", theta2in_values)
