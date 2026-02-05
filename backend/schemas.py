from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Union, Any

# --- Shared Models ---

class Transaction(BaseModel):
    id: str
    time: str
    from_: str = Field(..., alias="from") 
    to: str
    amount: float
    status: Optional[str] = "Normal"
    note: Optional[str] = None

    class Config:
        populate_by_name = True

class Node(BaseModel):
    id: str
    label: str
    type: str  # 'primary', 'normal', 'suspicious'
    transfers: int
    flagged: bool

class Edge(BaseModel):
    source: str
    target: str
    value: float
    suspicious: Optional[bool] = False

class GraphData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class ScatterPoint(BaseModel):
    x: float
    y: float
    label: str

class ScatterData(BaseModel):
    normal: List[ScatterPoint]
    suspicious: ScatterPoint

class VQEResults(BaseModel):
    energy: float
    probabilities: Dict[str, float]
    verdict: str
    confidence: str
    recommendation: str

class QSVCResults(BaseModel):
    fraudProbability: float
    advantage: float
    kernelType: str
    accuracy: float

class RiskEncoding(BaseModel):
    gnnVector: List[float]
    encodedVector: List[float]
    topK: int
    method: str

class QuantumPathSelection(BaseModel):
    threshold: float
    decision: str
    reason: str

class EnergyGap(BaseModel):
    groundEnergy: float
    observedEnergy: float
    deltaE: float
    interpretation: str

class SimulationStep(BaseModel):
    step: int
    description: str
    affectedNodes: int
    riskLevel: int
    riskMap: List[float]
    earlyWarning: Optional[str]

class DigitalTwin(BaseModel):
    scenario: str
    scenarioDescription: str
    simulationSteps: List[SimulationStep]

# --- Main API Response Model ---

class DashboardData(BaseModel):
    transactionHistory: List[Transaction]
    suspiciousTransaction: Transaction
    fraudRing: List[Transaction]
    networkGraph: GraphData
    perturbationVector: List[float]
    pcaVector: List[float]
    quantumVector: List[float]
    quantumVectorDisplay: List[float]
    hamiltonian: str
    vqeResults: VQEResults
    scatterData: ScatterData
    qsvcResults: QSVCResults
    riskEncoding: RiskEncoding
    quantumPathSelection: QuantumPathSelection
    energyGap: EnergyGap
    digitalTwin: DigitalTwin
