from oscillators import OscillatorsSimulator,plot_k1_vs_r1

simulator = OscillatorsSimulator(k1_start=1.0, k1_end=1.2, k2=8.0, n=100, tran=90000, niter=100000, h=0.01, dk=0.1)
results = simulator.simulate()

plot_k1_vs_r1(results)

plot_k1_vs_r1(results)