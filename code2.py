import numpy.f2py

# Compile Fortran code
numpy.f2py.compile('new.f95', modulename='fortran_module')

# Import the compiled module
import fortran_module

# Call Fortran subroutine/function
fortran_module.your_subroutine_or_function(args)
