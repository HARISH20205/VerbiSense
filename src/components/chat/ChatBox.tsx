export default function ChatBox() {
  return (
    <div className="w-full overflow-y-auto p-5">
      <div>
        <p>
        This text is about the **CYRUS team's work in the RoboCup 2D Soccer Simulation League**, a competition where autonomous agents play soccer in a simulated environment. 

The text focuses on the team's **achievements**, including their **wins** in RoboCup and other tournaments, and their **contributions** to the field of soccer simulation through various projects:

* **Helios:** Developed a player matchup algorithm for exchanging positions.
* **FRA-UNIted:** Created a Python-based framework for 2D soccer simulation.
* **ITAN-droids:** Optimized field evaluator algorithm and goalkeeper performance.
* **Persepolis:** Proposed an evolutionary algorithm for improving offensive strategy.
* **YuShan:** Used a half-filled offensive framework for team portrait building.
* **CYRUS:** Developed a defensive decision-making method using Reinforcement Learning (RL).
* **CppDNN:** Developed C++ Deep Neural Networks for predicting opponent movements and improving passing prediction.
* **Pyrus:** Created an open-source Python base for the 2D soccer simulation league, making it more accessible to developers.

The text then delves into a specific project: **Multi Action Dribble (MAD)**, which aims to improve dribbling skills in the simulation. MAD uses DNNs for opponent prediction and combines it with a Chain Action Algorithm and an Agent 2D Dribble Action Generator to create effective dribbling strategies. 

Finally, the text discusses the team's work on **pass prediction**, highlighting the challenges of dealing with noisy observations in the partial observation environment. Their approach involves developing a full-state action predictor, using Data Extractor to create more data, and employing machine learning algorithms for feature analysis. The text presents the results of these experiments, showing significant improvements in pass prediction accuracy.

In addition to the technical aspects, the text also touches on the team's approach to **defensive strategies**, focusing on marking algorithms like Proximity-Based Marking, Danger-Based Marking, and the Hungarian Method.

Overall, the text provides an overview of the CYRUS team's research and development efforts in the RoboCup 2D Soccer Simulation League, demonstrating their expertise in AI, machine learning, and game development.   
      </p>
      </div>
    </div>
  );
}
