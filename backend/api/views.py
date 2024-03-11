from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import subprocess
from django.conf import settings
import os
import time
import re
import numpy as np
import matplotlib.pyplot as plt
import networkx as nx
import seaborn as sns
from django.http import JsonResponse

from kuramoto import Kuramoto, plot_phase_coherence, plot_activity


BASE_DIR = settings.BASE_DIR
# Create your views here.
class run_fortran(APIView):
    def post(self,request):
        print('api call started')
        data = request.data
        result = None
        val = data['val']
        a = data['a']
        b = data['b']
        lambda2 = data['lambda2']
        lambda3 = data['lambda3']
        lambda1_step = data['lambda1_step']
        lambda1_max = data['lambda1_max']
        lambda1_min = data['lambda1_min']
        start_time = time.time()
        process = subprocess.Popen([os.path.join(BASE_DIR,"output100.fx")], stdin=subprocess.PIPE, stdout=subprocess.PIPE,stderr=subprocess.PIPE, text=True)
        input_data = f"{val}\n{a}\n{b}\n{lambda2}\n{lambda3}\n{lambda1_step}\n{lambda1_max}\n{lambda1_min}\n"
        stdout, stderr = process.communicate(input=input_data)
        execution_time = time.time() - start_time
        print("Subprocess output:", stdout)
        c = re.sub(' +', ',',stdout).split(',')
        print(c)
        arr = []
        for i in range(len(c)):
            if len(c[i])==0:
                continue
            else:
                if c[i]!="\n":
                    if "\n" in c[i]:
                        c[i] = c[i].replace('\n',"")
                    arr.append(c[i])


        k = []
        r1 = []
        r2 = []
        for i in range(0,len(arr),3):
            k.append(float(arr[i]))
        for i in range(1,len(arr),3):
            r1.append(float(arr[i]))
        for i in range(2,len(arr),3):
            r2.append(float(arr[i]))
        print(k)
        print(r1)
        print(r2)
        response = {
            "k":k,
            "r1":r1,
            "r2":r2,
            "execution_time":execution_time
        }
        return Response({'message': "Done", 'result': response})

class __get__angle__values__(APIView):
    def post(self,request):
        nodes = request.data.get('nodes')
        total_duration = request.data.get('total_duration')
        coupling = request.data.get('coupling')
        time_step_size = request.data.get('step_size')
        graph_nx = nx.erdos_renyi_graph(n=nodes, p=1) 
        adj_mat = nx.to_numpy_array(graph_nx)
        model = Kuramoto(coupling=coupling, dt=time_step_size, T=total_duration, n_nodes=len(adj_mat))
        activity = model.run(adj_mat=adj_mat)
        response = {
            'activity':activity,
            "activity_transpose":activity.T,
            "sin_of_activity_transpose":np.sin(activity.T),
            "phase_coherence_values":[Kuramoto.phase_coherence(vec) for vec in activity.T],
            "xlim":[i for i in range(len(activity.T.tolist())+1)],
        }
        response['activity'] = [list(row) for row in response['activity']]
        response['activity_transpose'] = [list(row) for row in response['activity_transpose']]
        return JsonResponse(response)
    
class __get__k__vs__r__values__(APIView):
    def post(self,request):
        nodes = request.data.get('nodes')
        total_duration = request.data.get('total_duration')
        coupling_start = request.data.get('coupling_start')
        coupling_end = request.data.get('coupling_end')
        coupling_step_size = request.data.get('coupling_step_size')
        coupling_vals = np.arange(coupling_start, coupling_end, coupling_step_size)
        time_step_size = request.data.get('step_size')
        graph_nx = nx.erdos_renyi_graph(n=nodes, p=1) 
        adj_mat = nx.to_numpy_array(graph_nx)
        runs = []
        for coupling in coupling_vals:
            model = Kuramoto(coupling=coupling, dt=time_step_size, T=total_duration, n_nodes=len(adj_mat))
            model.natfreqs = np.random.normal(1, 0.1, size=len(adj_mat))  
            act_mat = model.run(adj_mat=adj_mat)
            runs.append(act_mat)
        r_mean = []
        runs_array = np.array(runs)
        for i,coupling in enumerate(coupling_vals):
            r_mean.append(np.mean([model.phase_coherence(vec)
                      for vec in runs_array[i, :, -1000:].T]))
        response = {
            'coupling_vals':coupling_vals.tolist(),
            'r_mean':r_mean
        }
        return JsonResponse(response)

# f2py -c -m mymodule Master_symlpectic.f
